---
title: Solution to consume OnBase concurrent session licenses with REST API
date: 2024-08-20
readingTime: 10 min read
tags: [Java, Spring boot, Concurrent session, OnBase, Rest]
summary: How do a micro service consume a proper number of concurrent session licenses on OnBase system.
image: onbase-auth.png
---

## 1. Purpose

- One day, you can realise that your Microservice is consuming a lot of OnBase concurrent session license numbers. OnBase system uses this license to limit the number of concurrent users or services calling to the API Server. So, you only have 3 licenses for each service instance (or AWS ECS task). On the offical website <https://sdk.onbase.com/rest>, it shows that you need to call the `Disconnect` API to release the license you are using. But the website doesn't show you `How to handle it in a Microservice`. If you call this API in each request, your Microservice can increase the license usage because of the multi threads, multi requests but sharing one token.

- As a Java developer, I have to limit the license number that Microservice can consume.

- Here is a diagram of Authentication & Authorisation in OnBase system.

<img src="blog/img/onbase-auth.png" width="400" height="300">

## 2. How to do

- Note that multiple requests and threads are sharing a token when a request called to the API Authentication of OnBase server.
- Don't try to call the API `Authentication` to get an access token in each request. You should call this API to get a token in a request and keep this token in a cache for the requests after that.

```java

@Cacheable(cacheNames = "ACCESS_TOKEN")
public String token() {
  ...
}
```

- Don't call the API `Disconnect` at the end of each request. Let call it when your service is shutting down gratefully. So, you can release a license that multiple threads sharing.
- Using the API Heartbeat `/session/heartbeat` to keep the opening session in each service instance. You need a Job that schedule to call this API every 2 minutes.

```java

@Scheduled(cron = "0 */2 * * * *")
	public void heartBeat() {
		try {
			hylandClient.heartBeat();
		} catch (FeignException.BadRequest | FeignException.Unauthorized ex) {
			LOG.info("End to schedule heartBeat <invalid session>");
		}
	}
```

## 3. Conclusion

In this guidelines, you learn how to use the `HeartBeat` API to keep the lifespan of a concurrent session license and using the API `Disconnect` in a right way.
