# SC Fullstack Challenge


## Installation

Start the project

```bash
docker compose up -d
```

## Usage

Initial data is needed, because we need recipients and topics to use the app. Also a user to log in
```bash
docker compose run --rm django python manage.py loaddata initial.json.gz
```

Please do not punish me too hard for this, we will need the vite dev server to use the app:

Start vite server with:
```bash
cd newsletter_spa
yarn
yarn dev
```
In your browser go to [react app](http://localhost:5173/)

In username type: user

In password type: 123

And now you can interact with the app.

 * We can only send emails
 * After a newsletter submition you can go to [mailhog](http://127.0.0.1:8025), and we are going to find our emails there.
 * If you click some email you should see an html content wich contains the image(if you attached one). The content footer contains two links **one to unsubscribe from the topic** and other to **unsubscribe from any newsletter**.
 * Into the mails at the MIME tab you will be able to download the pdf file.
 * If you scheduled an email for the future, you can go and check the task status at:
   [celery flower](http://127.0.0.1:5555//) you will need the credentials located at ./envs./local/.django CELERY_FLOWER_USER and CELERY_FLOWER_PASSWORD
 * By the way the dashboard section does not refresh after sent an email, you need to reload to refresh the data :s
 
If you desire, you can go and log in to the django admin and change the data from the admin cruds:
[django admin](http://127.0.0.1:8000/admin)

Some project screenshots:
[login](https://github.com/juliocefe/sc_fullstack_challenge/blob/main/login.png?raw=true)
[home 1](https://github.com/juliocefe/sc_fullstack_challenge/blob/main/home1.png?raw=true)
[home 2](https://github.com/juliocefe/sc_fullstack_challenge/blob/main/home2.png?raw=true)
[formulary](https://github.com/juliocefe/sc_fullstack_challenge/blob/main/newsletter-formulary.png?raw=true)
[email content](https://github.com/juliocefe/sc_fullstack_challenge/blob/main/email.png?raw=true)
[flower](https://github.com/juliocefe/sc_fullstack_challenge/blob/main/flower.png?raw=true)


Thanks for following the steps, sorry about the vite dev server :S


    
