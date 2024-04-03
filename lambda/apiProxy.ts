import { APIGatewayProxyHandler } from 'aws-lambda';
export const options: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允許所有來源的跨域請求
      "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Notion-Version',
      "Access-Control-Allow-Methods": 'POST'
    },
    body: JSON.stringify("ok")
  };
}

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.queryStringParameters) throw "no paramaters"
    // 目標 API 的 URL
    const targetURL = event.queryStringParameters.url ? event.queryStringParameters.url : "https://linyejoe2.site"; // 替換為您要代理的目標 API 的 URL

    // 使用 fetch 方法發送請求
    const response = await fetch(targetURL, {
      method: event.requestContext.httpMethod ? event.requestContext.httpMethod : event.requestContext["http"].method,
      headers: {
        ...event.headers as any
      }
    })

    // 檢查響應狀態碼
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析 JSON 格式的響應
    const data = await response.json();
    console.log(data);

    // 返回成功的響應
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // 允許所有來源的跨域請求
        "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Notion-Version',
        "Access-Control-Allow-Methods": 'POST'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error:', error);
    // 返回錯誤響應
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // 允許所有來源的跨域請求
        "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Notion-Version',
        "Access-Control-Allow-Methods": 'POST'
      },
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
