#!/bin/bash

# Configuração
DOCKERHUB_USER="thinklesshouse"
FRONTEND_DIR="weburn-pos-buy"
ARCHITECTURE=linux/amd64

# Função de animação
spinner() {
  local pid=$!
  local delay=0.1
  local spinstr='|/-\'
  while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
    local temp=${spinstr#?}
    printf " [%c]  " "$spinstr"
    local spinstr=$temp${spinstr%"$temp"}
    sleep $delay
    printf "\b\b\b\b\b\b"
  done
  printf "    \b\b\b\b"
}

# Função para verificar o sucesso da ação
check_success() {
  local exit_code=$1
  local duration=$2
  if [ $exit_code -eq 0 ]; then
    printf " [OK] (%02d s)\n" $duration
  else
    printf " [ERRO] (%02d s)\n" $duration
    exit 1
  fi
}

# Perguntar sobre o ambiente de desenvolvimento
read -p "Qual ambiente de desenvolvimento? (production): " BUILD_ENV
BUILD_ENV=${BUILD_ENV:-production}

# Atualizar os repositórios
echo -n "Atualizando o repositório frontend..."
start_time=$(date +%s)
(npm run build -- --configuration $BUILD_ENV >/dev/null 2>&1) & spinner
(git add . >/dev/null 2>&1) & spinner
(git commit -m "Atualizando dist" >/dev/null 2>&1) & spinner
(git push >/dev/null 2>&1) & spinner
end_time=$(date +%s)
duration=$((end_time - start_time))
check_success $? $duration

# Criar as imagens do Docker com um Docker-Compose sem iniciar os containers

# echo -n "Criando as imagens do Docker..."
# start_time=$(date +%s)
# docker-compose up -d --no-start >/dev/null 2>&1 & spinner
# end_time=$(date +%s)
# duration=$((end_time - start_time))
# check_success $? $duration

# Criar uma imagem nova do Frontend e mandar para o DockerHub

echo -n "Criando a imagem do frontend..."
start_time=$(date +%s)
(docker buildx build --push --platform ${ARCHITECTURE} -t $DOCKERHUB_USER/$FRONTEND_DIR . >/dev/null 2>&1) & spinner
end_time=$(date +%s)
duration=$((end_time - start_time))
check_success $? $duration

echo -n "Enviando a imagem do frontend para o DockerHub..."
start_time=$(date +%s)
docker push $DOCKERHUB_USER/$FRONTEND_DIR >/dev/null 2>&1 & spinner
end_time=$(date +%s)
duration=$((end_time - start_time))
check_success $? $duration
