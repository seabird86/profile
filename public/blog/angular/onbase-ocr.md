---
title: Using Tesseract OCR to redact PII in OnBase
date: 2023-12-01
readingTime: 10 min read
tags: [OnBase, OCR, Tesseract, Image]
summary: Using open source Tesseract OCR library to redact sensitive information in image or PDF files in OnBase system.
image: onbase-ocr.png
---

Reading this post, you can realise that I also successfully developed features of OnBase system with the language C#.

## 1. Purpose

- PII is known as Personal Identifiable Information and OnBase is well known as a content management product in insurance companies <https://www.hyland.com/en/solutions/products/onbase>. As a business officer, he would like to redact customer's PII in a PDF or image file in the OnBase system. You can use the feature of OnBase but it needs a license cost, not free, not cheap, not allow you to customise and code as you want. As an C# developer, I need to find an open source OCR library to recognise words, phrases, sentences in TIFF image or PDF files as well as their positions and areas. The texts/phrases/sentences should have a relative position with PII. Finally, I can calculate the position and area of PII then use the redact function in the OnBase SDK to redact them. It was really a hard task because it was only my draft idea, no clue, no suggestion, no example as well as no recommendation from OnBase community. However, I nailed it. It helps us have more extended features on OnBase system without the license cost.

- For example, I would like to redact the `incident details` area. I need to recognise the phrases and the position of the label `Incident Details` and `Reported Damage` that are close to the `incident details` area. You also need to recognise the section of `Claim Details` to make sure it's in this section. Here is the result as well as the figured calculation I did:

<img src="blog/img/onbase-ocr.png" width="300" height="150">

## 2. How to do

Files for OCR Library that OnBase can import includes:

 - tessdata/eng.traineddata : It's a language data to train Get from <https://github.com/tesseract-ocr/tessdata>
 - tessdata/pdf.ttf : Get from <https://github.com/tesseract-ocr/tessconfigs/tree/main>
 - Using Microsoft visual studio to build the source code <https://github.com/Hiale/tesseract/tree/pixaReadMemMultipageTiff> and get the fields in the folder `tesseract-pixaReadMemMultipageTiff\tesseract-pixaReadMemMultipageTiff\src\Tesseract\bin\Debug\netstandard2.0`. The Onbase I did only support dotnet standard2.0. This library supports the file type `tiff`. This folder includes the following library files.

 ```bash

	 - x64/tesseract41.dll
	 - x64/leptonica-1.80.0.dll
	 - Tesseract.dll
 ```

Ater you got all libary files, you organise the folder like:

```

onbase\
  - tessdata\
    - eng.traineddata
    - tessdata/pdf.ttf
  - x64\
    - tesseract41.dll
    - leptonica-1.80.0.dll
 ```

In the Onbase Unity script, set a configuratioin to load trained data and fonts.

```java

InteropDotNet.LibraryLoader.Instance.CustomSearchPath = @"\\onbase\OCR";
```
- Using OnBase studio to import the assembly file Tesseract.dll in Unity script.

- Finally, you can load the library, language and engine mode and use the instant `engine` to scan a file and recognise texts, words, sentences as well as their position to redact them.

```java

using (var engine = new TesseractEngine(@"\\onbase\OCR\tessdata", "eng", EngineMode.Default)){...}

```

## 3. Conclusion

In this guidelines, you learn how to use `OCR` libary in the OnBase system. OnBase system usually is used in the insurance

## 4. References

Thanks for open source Tesseract OCR as well as the libraries that supports PDF and TIFF file.

 - <https://tesseract-ocr.github.io>
 - <https://sdk.onbase.com> You need a Hyland account to access this link.
