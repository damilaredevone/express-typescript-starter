# Guideline For Breeze Pay

## Requests

Create a folder called requests or validations that holds request validations

```ts

// install validatorjs if using typescript install the types as well
// npm i validatorjs
// for typescript add the typings for module augmetation. npm i -D @types/validatorjs

// you can also read more about validatorjs in their documetation
declare module "validatorjs" {
  import { validatorjs} from 'validatorjs'

  export validatorjs
}
```

Create a validation file you need. i.e `CreateVirtualAccountRequest`

```ts
export class CreateVirtualAccountRequest {
  constructor(req, res, next) {
    this.validate(req, res, next)
  }

  public validate(req, res, next) {
    // rules for request i need to validate
    const rules = {
      merchant_id: 'required|string',
      terminal_id: 'required|string',
    }

    const validator = new Validator(req.body, rules)

    validator.passes(() => next())

    validator.fails(() => {
      return res.json(
        errorResponse(validator.errors.all(), 'Invalid Form Data', StatusCode.UNPROCESSABLE),
      )
    })
  }
}
```

## Controller

Create a controller called `breezePayController` in controllers folder.

```ts
export class BreezePayController {
  public createVirtualAccount = async (req, res) => {
    // Get the virtual account request from the client. req
    // validate the request coming from client
    // You can create a class that validate request using third party validation packages
    // i.e validatorjs or (class-validator and class-transformer) google search
    // i.e request to validate merchant_id, terminal_id
    // pass the request data to the service for data manipulation and saving of third party response if communicating with any third party
    // breeze pay in this case
    // create a new service called breeze-pay service if not already created in services directory
    // i.e const data = { merchant_id: req.body.merchant_id, terminal_id: req.body.terminal_id }
    // const response = await breezePayService.createVirtualAccount(data);

    const data = { merchant_id: req.body?.merchant_id, terminal_id: req,body?.terminal_id }

    const result = await breezePayService.createVirtualAccount(data, res)

    // use custom response structure to return this response if there's any. In this case, we are using the Middleware helper function

    return Middleware.successResponse(res, StatusCode.OK, 'Virtual Account created successfully', result)
  }

  public webhookHandler = async (req, res) => {
    // For handling webhook requests from the third party provider (Breezepay)
    // pass the request to the service
  }
}
```

## Service

Create a new service called `breezePayService` in services folder
create two methods called `createVirtualAccount` and `handleWehbookRequest` in service class

```ts
import { virtualAccount, merchants } from '@models'

export class BreezePayService {
  public virtualAccountModel
  public merchantsModel

  constructor() {
    this.virtualAccountModel = virtualAccount
    this.merchantsModel = merchants
  }

  public createVirtualAccount = (data, res) => {
    // check if the merchant_id and terminal_id is valid
    // check the model schema
    const { merchant_id, terminal_id } = data
    const findMerchant = this.merchants.findOne({ merchant_id, terminal_id })
    // in MYSQL
    // select * from merchants where merchant_id = 'merchant_id' and terminal_id = 'terminal_id' limit 1

    if (!findMerchant) {
      return Middleware.errorResponse(res, StatusCode.NOT_FOUND, 'Merchant not found')
    }
    // ...
  }

  public handleWehbookRequest = (req) => {}
}
```

<br />

## Route

Create a controller called breezePayRoute in routes folder

```ts
// breezePayRoute.js

import { Router } from 'express'

const router = new Router()
import { CreateVirtualAccountRequest } from '@requests'

// import breezepay controller
const breezePayController = new BreezePayController()

router.post(
  '/breezepay/virtual-account',
  CreateVirtualAccountRequest,
  breezePayController.createVirtualAccount,
)

router.post('/breezepay/webhook', breezePayController.handleWebhookRequest)

// create the neccessary route for breeze pay

//generate virtual account route
```
