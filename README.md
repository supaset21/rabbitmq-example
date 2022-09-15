# RabbitMQ Example

Run docker command

```sh
docker run -d --hostname my-rabbit --name some-rabbit -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password -p 5672:5672 -p 8080:15672 rabbitmq:3-management
```

Can see monitor at

http://localhost:8080