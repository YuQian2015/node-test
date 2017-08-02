## nginx 配置
https://www.nginx.com/resources/admin-guide/

## nginx SERVING STATIC CONTENT
https://www.nginx.com/resources/admin-guide/serving-static-content/

## Nginx 配置 监听8089
location ~* \.(css|js|gif|jpe?g|png)$ {
  root      "F:/project/tjjy";
  expires   7d;
}
