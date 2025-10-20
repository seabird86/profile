---
title: "Display the colorful fireflies effect"
date: "01 May 2024"
readingTime: 3 min read
tags: [Angular, SCSS]
summary: "Using CSS to display colorful firefly effect in a background."
image: firefly.png
---

## 1. Purpose

As an angular developer, I would like to display the colorful fireflies effect by using only SCSS. You can see the result of this effect in [Home](/) page (You have to wait 15 seconds for firefly's appearance in the banner)

## 2. How to do

 - Just add 50 elements in a web page. Each element corresponds to a firefly

```html

@for (item of [].constructor(50); track $index) {
  <div class="firefly-container">    
    <div class="firefly"></div>
  </div>
}
```

 - Using the following SCSS code block to turn these elements into colorful fireflies.

```css

@use 'sass:list';
@use 'sass:math';

.firefly-container {
    $particleNum: 50;
    $particleColor: hsl(180, 100%, 80%);
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translateY(-10vh);
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    .firefly {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        mix-blend-mode: screen;
        animation: fade-frames 200ms infinite, scale-frames 2s infinite;
        @keyframes fade-frames {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.7;
            }
            100% {
                opacity: 1;
            }
        }

        @keyframes scale-frames {
            0% {
                transform: scale3d(0.4, 0.4, 1);
            }

            50% {
                transform: scale3d(2.2, 2.2, 1);
            }

            100% {
                transform: scale3d(0.4, 0.4, 1);
            }
        }
    }
    $particleBaseSize: 15;
    @for $i from 1 through $particleNum {
        &:nth-child(#{$i}) {
            $circleSize: math.random($particleBaseSize);
            width: $circleSize + px;
            height: $circleSize + px;
            $framesName: "move-frames-" + $i;
            $moveDuration: 28000 + math.random(9000) + ms;

            animation-name: #{$framesName};
            animation-duration: $moveDuration;
            animation-delay: math.random(30000) + ms;

            @keyframes #{$framesName} {
                from {
                    transform: translate3d(math.random(100) + vw, math.random(30) + 100 + vh, 0);
                }

                to {
                    transform: translate3d(math.random(100) + vw, math.random(65) + px, 0);
                }
            }
            .firefly {
                animation-delay: math.random(4000) + ms;
                background-image: list.nth([radial-gradient(hsl(62, 55%, 90%),
                            hsl(270, 14%, 97%) 10%,
                            hsla(0, 0%, 0%, 0) 56%),
                        radial-gradient(hsl(30, 12%, 97%),
                            hsl(285, 69%, 75%) 10%,
                            hsla(0, 0%, 0%, 0) 56%),
                        radial-gradient(hsl(30, 12%, 97%),
                            hsl(60, 92%, 55%) 10%,
                            hsla(0, 0%, 0%, 0) 56%),
                        radial-gradient(hsl(30, 12%, 97%),
                            hsl(147, 77%, 79%) 10%,
                            hsla(0, 0%, 0%, 0) 56%),
                        radial-gradient(hsl(30, 12%, 97%),
                            hsl(231, 83%, 66%) 10%,
                            hsla(0, 0%, 0%, 0) 56%)], math.random(5));
            }
        }
    }
}

```

You can:

 - Customize the number of fireflies `$particleNum` and their sizes `particleBaseSize`.
 - Add more colors in `background-image` if you want.
 - Change the appearance time of fireflies `animation-delay` as well as animation duration `animation-duration`.

## 3. Conclusion

In this guidelines, you learn how to use `SCSS` to create an animations of a firefly.

## 4. References

Thanks for the original auth `Takeshi Kano` who developed this effect, published and shared to everyone. This help me make the beautiful colorful fireflies.

 - <https://codepen.io/tonkotsuboy/pen/zJbKNN">
        