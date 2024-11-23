const API_KEY = "ct0reqpr01qkfpo5se2gct0reqpr01qkfpo5se30"; // Finnhub API key

const nifty50Stocks = [
    'TCS.NS', 'RELIANCE.NS', 'INFY.NS', 'HDFCBANK.NS', 'ICICIBANK.NS', 'SBIN.NS', 'HDFC.NS', 'KOTAKBANK.NS', 'LT.NS', 'ITC.NS',
    'HCLTECH.NS', 'BHARTIARTL.NS', 'MARUTI.NS', 'ASIANPAINT.NS', 'ULTRACEMCO.NS', 'AXISBANK.NS', 'M&M.NS', 'NESTLEIND.NS', 'BAJFINANCE.NS',
    'POWERGRID.NS', 'HINDUNILVR.NS', 'BAJAJ-AUTO.NS', 'RELIANCE.NS', 'TITAN.NS', 'SUNPHARMA.NS', 'NTPC.NS', 'ITC.NS', 'WIPRO.NS',
    'INDUSINDBK.NS', 'ULTRACEMCO.NS', 'MARUTI.NS', 'HDFC.LTD.NS', 'TATAMOTORS.NS', 'JSWSTEEL.NS', 'HINDALCO.NS', 'BOSCHLTD.NS', 'GRASIM.NS',
    'DABUR.NS', 'MOTHERSUMI.NS', 'VEDL.NS', 'BHEL.NS', 'ZEE.NS', 'TATASTEEL.NS', 'TCS.NS', 'RELIANCE.NS'
];

const indexes = ['^NSEI', '^BSESN']; // Nifty and Sensex

// Fetch stock data from Finnhub API
async function getStockData(symbol) {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Fetch index data
async function getIndexData(symbol) {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Display stock list
async function displayStockList() {
    const stocksListDiv = document.getElementById('stocks-list');
    stocksListDiv.innerHTML = '';
    
    for (let stock of nifty50Stocks) {
        const stockData = await getStockData(stock);
        if (stockData) {
            stocksListDiv.innerHTML += `
                <div class="stock-item">
                    <h3>${stock}</h3>
                    <p>Current: ₹${stockData.c}</p>
                    <p>Open: ₹${stockData.o}</p>
                    <p>High: ₹${stockData.h}</p>
                    <p>Low: ₹${stockData.l}</p>
                    <p>Previous Close: ₹${stockData.pc}</p>
                </div>
            `;
        }
    }
}

// Display major indexes
async function displayMajorIndexes() {
    const majorIndexesDiv = document.getElementById('major-indexes');
    majorIndexesDiv.innerHTML = '';
    
    for (let index of indexes) {
        const indexData = await getIndexData(index);
        if (indexData) {
            majorIndexesDiv.innerHTML += `
                <div class="index-item">
                    <h3>${index}</h3>
                    <p>Current: ₹${indexData.c}</p>
                    <p>Open: ₹${indexData.o}</p>
                    <p>High: ₹${indexData.h}</p>
                    <p>Low: ₹${indexData.l}</p>
                    <p>Previous Close: ₹${indexData.pc}</p>
                </div>
            `;
        }
    }
}

// Display data for indexes
async function displayIndexData() {
    const indexDataDiv = document.getElementById('index-data');
    indexDataDiv.innerHTML = 'Fetching data...';
    
    for (let index of indexes) {
        const data = await getIndexData(index);
        if (data) {
            indexDataDiv.innerHTML += `
                <div class="index-item">
                    <h3>${index}</h3>
                    <p>Current: ₹${data.c}</p>
                    <p>Open: ₹${data.o}</p>
                    <p>High: ₹${data.h}</p>
                    <p>Low: ₹${data.l}</p>
                    <p>Previous Close: ₹${data.pc}</p>
                </div>
            `;
        }
    }
}

// Open the corresponding tab
function openTab(evt, tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Initialize
window.onload = function() {
    displayStockList();
    displayMajorIndexes();
    openTab(event, 'home');
};
