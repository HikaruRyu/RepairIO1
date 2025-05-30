
# RepairIO


## Deployment

To deploy this project localy clone this repository, open a terminal inside the new folder, rename ".env.example" to ".env." and run

**Needs a working docker enviorment!**

```bash
  make start-composer
```
If you don't have "make" installed, run
```bash
  docker compose build --no-cache
	docker compose up -d
```
