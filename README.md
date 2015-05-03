# streams2mongo
A  small package to save twitter streams into a mongodb. Can be used with any other json data piped into it

 streams2mongo --host MONGO_HOST --port MONGO_PORT --db MONGO_DB_NAME --collection MONGO_COLLECTION > streams2mongo.log


## Usage with the twitter npm library: 

twitter stream "yoursearch" --json | streams2mongo --host MONGO_HOST --port MONGO_PORT --db MONGO_DB_NAME --collection MONGO_COLLECTION

## Additional info 

You can pipe any json content into streams2mongo and have it in your mongodb . 
Content such as 
{a:"text"}

{b:"text"}

Will be split with the \n delimiter and saved as a  separate json object.

Errors while parsing the JSON or saving to the mongodb will be shown in the cli , and can be redirected to a log file if you want to check them out later. 

Example 

twitter stream "yoursearch" --json | streams2mongo --host MONGO_HOST --port MONGO_PORT --db MONGO_DB_NAME --collection MONGO_COLLECTION > streams2mongo.log




