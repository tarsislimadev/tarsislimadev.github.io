import * as COMPONENTS from '../../../assets/js/components/inputs.component.js'
import { InputComponent } from '../../../assets/js/components/input.component.js'

export class InputsComponent extends COMPONENTS.InputsComponent {
  components = {
    APIKey: new InputComponent({ label: 'APIKey' }),
    Amount: new InputComponent({ label: 'Amount' }),
    Code: new InputComponent({ label: 'Code' }),
    Depth: new InputComponent({ label: 'Depth' }),
    FromDate: new InputComponent({ label: 'FromDate', type: 'datetime' }),
    IncludeLastCount: new InputComponent({ label: 'IncludeLastCount' }),
    Interval: new InputComponent({ label: 'Interval' }),
    Limit: new InputComponent({ label: 'Limit' }),
    LimitPrice: new InputComponent({ label: 'LimitPrice' }),
    MakerTaker: new InputComponent({ label: 'MakerTaker' }),
    Nonce: new InputComponent({ label: 'Nonce' }),
    OrderIdOCO: new InputComponent({ label: 'OrderIdOCO' }),
    OrderType: new InputComponent({ label: 'OrderType' }),
    PegPriceType: new InputComponent({ label: 'PegPriceType' }),
    Side: new InputComponent({ label: 'Side' }),
    Signature: new InputComponent({ label: 'Signature' }),
    StartIndex: new InputComponent({ label: 'StartIndex' }),
    TimeInForce: new InputComponent({ label: 'TimeInForce' }),
    ToDate: new InputComponent({ label: 'ToDate', type: 'datetime' }),
    UseDisplayQuantity: new InputComponent({ label: 'UseDisplayQuantity' }),
    depth: new InputComponent({ label: 'depth' }),
    startIndex: new InputComponent({ label: 'startIndex' }),
    endTimeStamp: new InputComponent({ label: 'endTimeStamp', type: 'datetime' }),
    startTimeStamp: new InputComponent({ label: 'startTimeStamp', type: 'datetime' }),
    AccountId: new InputComponent({ label: 'AccountId' }),
    ClOrderId: new InputComponent({ label: 'ClOrderId' }),
    ClientOrderId: new InputComponent({ label: 'ClientOrderId' }),
    Count: new InputComponent({ label: 'Count' }),
    InstrumentId: new InputComponent({ label: 'InstrumentId' }),
    IntrumentId: new InputComponent({ label: 'IntrumentId' }),
    MarketId: new InputComponent({ label: 'MarketId', value: 'btcbrl' }),
    OMSId: new InputComponent({ label: 'OMSId' }),
    OrderId: new InputComponent({ label: 'OrderId' }),
    ProductId: new InputComponent({ label: 'ProductId' }),
    Quantity: new InputComponent({ label: 'Quantity' }),
    UserId: new InputComponent({ label: 'UserId' }),
    accountId: new InputComponent({ label: 'accountId' }),
    executionId: new InputComponent({ label: 'executionId' }),
    instrumentId: new InputComponent({ label: 'instrumentId' }),
    omsId: new InputComponent({ label: 'omsId' }),
    orderId: new InputComponent({ label: 'orderId' }),
    tradeId: new InputComponent({ label: 'tradeId' }),
    userId: new InputComponent({ label: 'userId' }),

  }
}
