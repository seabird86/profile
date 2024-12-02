# Angular CLI

- `ng serve`
- `ng generate component component-name`
- `ng generate directive|pipe|service|class|guard|interface|enum|module`
- `ng build` -> `dist/` directory
- `ng test`
- `ng e2e`
- `ng help`

# URL path (nginx)

- `brew install nginx`
- `nginx`
- `nginx -s reload`

```
server {
    location /
    {
        try_files $uri $uri/ /index.html;
    }
}
```
```
ng add @angular/material
Include animation module ? Y
```

- `ng generate -c -d public/Home`




# Change log

### Fix issue of base href

- Add `"externalDependencies": ["home/*"]` into angular.json
- Change url from relative-root path '/home/abc.jpg' into relative path 'home/abc.jpg'

### Fix issue 404 Not found

- After build, copy the file index.hmtl to 404.html and put the same folder.