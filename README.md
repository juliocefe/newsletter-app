# SC Fullstack Challenge


## Installation

Start the project

```bash
docker compose -f up -d
```

## Usage

Initial data is needed, because we need recipients and topics to use the app. Also a user to log in
```bash
docker compose run --rm django python manage.py loaddata mydata.json.gz
```

Please do not punish me to hard for this, we will ned to use the vite dev server to use the app :(:
In your browser go to [react app](http://localhost:5173/)

In username type: user

In password type: 123

And now you can interact with the app.

 * We can only send emails
 * After a newsletter submition you can go to [mailhog](http://127.0.0.1:8025), and we are going to see our emails there.
 * If you click some email you should see an html content with a photo(if you submitted one)
 * Into the mails at the MIME tab you can download the pdf file.
 * If you schedule an email for the future, you can go and check the task statis at:
   [celery flower](http://127.0.0.1:5555//) you will need the credentials located at ./envs.django CELERY_FLOWER_USER and CELERY_FLOWER_PASSWORD
 * The dashboard does not refresh after send the email, you need to reload to refresh the data
 
If you desire, you can go and log in to the django admin and change the data from the admin cruds:
[django admin](http://127.0.0.1:8000/admin)

![alt text](https://github.com/juliocefe/sc_challenge/blob/main/accounts.png?raw=true)

![alt text](https://github.com/juliocefe/sc_challenge/blob/main/transactions.png?raw=true)

Thanks for follow the steps, sorry about the vite dev server :S


    
