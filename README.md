# Develop

to run the app the first time:

```
$ docker compose up -d
$ docker compose exec app pnpm run migrate
$ docker compose exec app pnpm run seed
```

