# Pos Buy - Weburn

Frontend do Cloud Functions - Weburn-Voucher-Dispenser-V2


## Deploy

Para fazer o deploy desse projeto no GCP

```bash
  docker-compose up --no-start
```
```bash
  gcloud config set project weburn-376622
```
```bash
  gcloud builds submit --tag gcr.io/weburn-376622/weburn-pos-buy
```
```bash
  gcloud run deploy pos-buy-frontend 
  / --allow-unauthenticated 
  / --platform managed 
  / --image gcr.io/weburn-376622/weburn-pos-buy
```
