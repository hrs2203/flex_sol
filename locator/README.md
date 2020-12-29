# Car Location Problem

1. Explain what and why the technologies you recommend should be used? 
    I used NodeJs as backend and Pug to render static web site.
    I would recommend to use Vue.Js or React.Js in such cases of dynamic websites.
    Why I did not used React or Vue : I would taken me longer as i am not much fluent in react or vue
    How i used NodeJs and Pug : rendering static website at set interval of 2 seconds. and storing the data in memory cache.

2. Deployment strategies. (Bonus point for a production setup diagram)
    Deploy using a simple amazon ec2 instance and store data in amazon bucket if needed.
    Plus point: if deployed with a bucket storage, this will allow for a more robust and stable database as compared to am in menory approach.

3. What kind of tests could be integrated in the CI/CD pipeline?
    REST API test just to make sure that any new changes doesnot breakes the pipeline.
    frameword to be used: Mocha.