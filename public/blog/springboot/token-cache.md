---
title: Cache access tokens in Spring Boot
date: 2025-08-24
readingTime: 5 min read
tags: [Java, Spring boot, Cache, Access token]
summary: How to cache multiple access tokens in Spring Boot.
image: token-cache.png
---

## 1. Purpose

Caching access tokens is an important step to imporve performance of your applications. An authentication API usually responds the expiry time in the field `expires_in`.

```json
{
  "access_token": "your_access_token_here",
  "expires_in": 3600
}

```

 As a java developer, I will use CacheManager in the spring boot to cache its value in a duration `expires_in`.

<img src="blog/img/token-cache.png" width="300" height="150">

## 2. How to do

First of all, you need to define a class that includes the token value and its expiresIn because we will map the authentication response to this object then cache both of the fields.

```java

public record CacheValue(String token, long expiresIn) {
}

```

You need to configure to create a CacheManager bean where you define all caches as well as the following strategy of expiry time. `expires_in` is a time range from when access token was created to when it expires. So, it only focuses on the method `expireAfterCreate`.


```java

@Bean
public CacheManager createCacheManager() {
	final SimpleCacheManager cacheManager = new SimpleCacheManager();
	cacheManager.setCaches(List.of(
		new CaffeineCache(CacheConstant.ACCESS_TOKEN, Caffeine.newBuilder()
			.expireAfter(new Expiry<>() {
				@Override
				public long expireAfterCreate(Object key, Object value, long currentTime) {
					return ((CacheValue) value).expiresIn();
				}

				@Override
				public long expireAfterUpdate(Object key, Object value, long currentTime, long currentDuration) {
					return currentDuration;
				}

				@Override
				public long expireAfterRead(Object key, Object value, long currentTime, long currentDuration) {
					return currentDuration;
				}
			}).build(),false)
	));
	return cacheManager;
}
```

Finally, you can call your API to get the access token with `@Cachable` annotation. You have to return an instance of CacheValue.

```java

@Cacheable(cacheNames = CacheConstant.ACCESS_TOKEN)
public CacheValue token() {
	// get tokenResponse by calling your API
	final long expiresIn = tokenResponse.expiresIn() - Config.getExpiryBufferSeconds();
	return new CacheValue(tokenResponse.token(), expiresIn);
}
```

 > You need to buffer a small time to make sure that the cached token will still be available in the a API server when you pull it from the cache. This buffer value should be 1 or 2 minutes.


## 3. Conclusion

In this guidelines, you learn how to use the CacheManager to cache with multiple keys. You also learn the way to cache an access token with its expiresIn.
