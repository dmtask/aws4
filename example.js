var http = require('https');
var aws4  = require('.');

// to illustrate usage, we'll create a utility function to request and pipe to stdout
function request(opts) { http.request(opts, function(res) { res.pipe(process.stdout) }).end(opts.body || '') }

// aws4 will sign an options object as you'd pass to http.request, with an AWS service and region
var opts = { host: '', path: '', service: 's3', region: '' };

// aws4.sign() will sign and modify these options, ready to pass to http.request
aws4.sign(opts, { accessKeyId: '', secretAccessKey: '' });

// or it can get credentials from process.env.AWS_ACCESS_KEY_ID, etc
//aws4.sign(opts);

console.log(opts);
/*
{
  host: 'sqs.us-east-1.amazonaws.com',
  path: '/?Action=ListQueues',
  headers: {
    Host: 'sqs.us-east-1.amazonaws.com',
    'X-Amz-Date': '20121226T061030Z',
    Authorization: 'AWS4-HMAC-SHA256 Credential=ABCDEF/20121226/us-east-1/sqs/aws4_request, ...'
  }
}
*/

// we can now use this to query AWS
request(opts);
