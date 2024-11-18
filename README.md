# Angular CLI

- `ng serve`
- `ng generate component component-name`
- `ng generate directive|pipe|service|class|guard|interface|enum|module`
- `ng build` -> `dist/` directory
- `ng test`
- `ng e2e`
- `ng help`

# URL path (nginx)

```
server {
    location /
    {
        try_files $uri $uri/ /index.html;
    }
}
```