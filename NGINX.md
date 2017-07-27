## nginx 配置
https://www.nginx.com/resources/admin-guide/

## nginx SERVING STATIC CONTENT
https://www.nginx.com/resources/admin-guide/serving-static-content/

location ~* \.(css|js|gif|jpe?g|png)$ {
  root      "F:/project/tjjy/static/images";
  expires   30d;
}
