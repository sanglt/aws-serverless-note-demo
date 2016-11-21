````
serverless create --template aws-nodejs

````

````
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get
          cors:
            - origins: "*"
````
