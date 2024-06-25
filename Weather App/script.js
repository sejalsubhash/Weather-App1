// script.js

document.getElementById('stockForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const stockSymbol = document.getElementById('stockSymbol').value.toUpperCase();
    getStockData(stockSymbol);
});

async function getStockData(symbol) {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data['Error Message']) {
            alert('Invalid stock symbol. Please try again.');
            return;
        }
        const metaData = data['Meta Data'];
        const timeSeries = data['Time Series (5min)'];
        const latestTime = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestTime];

        document.getElementById('companyName').innerText = `Stock: ${metaData['2. Symbol']}`;
        document.getElementById('currentPrice').innerText = `$${parseFloat(latestData['4. close']).toFixed(2)}`;
        document.getElementById('openPrice').innerText = `$${parseFloat(latestData['1. open']).toFixed(2)}`;
        document.getElementById('highPrice').innerText = `$${parseFloat(latestData['2. high']).toFixed(2)}`;
        document.getElementById('lowPrice').innerText = `$${parseFloat(latestData['3. low']).toFixed(2)}`;
        document.getElementById('previousClose').innerText = `$${parseFloat(latestData['5. volume']).toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        alert('There was an error fetching the stock data. Please try again later.');
    }
}
