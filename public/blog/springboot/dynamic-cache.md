---
title: Cache access tokens in Spring Boot
date: 2025-08-24
readingTime: 5 min read
tags: [Java, Spring boot, Cache, Access token]
summary: How to cache multiple access tokens in Spring Boot.
image: token-cache.png
---

## 1. Purpose

- In the fact, you have to cache access tokens to avoid from calling a lot of the authentication API. As a java developer, if it's an access token, I would like to cache it with its expiresIn.

<img src="blog/img/token-cache.png" width="300" height="150">

## 2. How to do

- Because you need cache with lifetime of an access token, so you need to define a class that includes the token value and its expiresIn.

```java

public record CacheValue(String data, long expiresIn) {
}

```

- Using CacheManager, you can create multiple caches and set up the expire strategies for them.


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

- Finally, you can call your API to get the access token with `@Cachable` annotation. You have to return an instance of CacheValue.

```java

@Cacheable(cacheNames = CacheConstant.ACCESS_TOKEN)
public CacheValue token() {
	// get tokenResponse by calling your API
	final long expiresIn = tokenResponse.expiresIn() - Config.getExpiryBufferSeconds();
	return new CacheValue(tokenResponse.token(), expiresIn);
}
```

Note that, you need to buffer a small time to make sure that this cached token is still available when you pull it from the cache and pass it to a API server. It should be 1 or 2 minutes.


## 3. Conclusion

In this guidelines, you learn how to use the CacheManager to cache with multiple keys. You also learn the way to cache an access token with its expiresIn.
