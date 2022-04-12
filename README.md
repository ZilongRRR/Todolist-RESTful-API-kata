## 六角學院 : Node.js 直播班-2022春季
預習任務：Todolist RESTful API kata

### Heroku 環境設置

* Add `process.env.PORT`

```js
server.listen(process.env.PORT || 3005);
```

* package.json :
  * add `start`
  ```js
  "scripts": {
     ...
      "start" : "node src/server.js" // need this
    },
  ```
  * add node version
  ```js
   "engines": {
      "node": "17.x"
    }
  ```

### Heroku Deploy
* Download herolu cli
```
sudo npm install -g heroku // NOTE : may have the permission error, so use sudo
```
* Login
```
heroku login
```
* Create
```
heroku create
```
* push
```
git push heroku main // heroku would create a new branch
```
* Open app
```
heroku open
```
or 
<img width="1264" alt="image" src="https://user-images.githubusercontent.com/30789617/162991164-56e52eb6-3fd6-4c34-be46-ac78c47e63cd.png">
