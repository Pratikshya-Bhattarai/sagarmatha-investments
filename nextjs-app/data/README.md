# NEPSE Data Directory

This directory is for storing NEPSE historical data files downloaded from Kaggle.

## How to get the data:

1. **Go to Kaggle Dataset**: [NEPSE Index Historical Data](https://www.kaggle.com/datasets/dimanjung/nepse-index-historical-data)

2. **Download the dataset**:
   - Click "Download" button
   - Accept any terms and conditions
   - Extract the ZIP file

3. **Place CSV files here**:
   - Rename your main CSV file to `nepse-index.csv`
   - If you have separate files for stocks, rename to `nepse-stocks.csv`
   - If you have indices data, rename to `nepse-indices.csv`

4. **Run the import script**:
   ```bash
   npm run import-nepse
   ```

## Expected CSV Format:

### nepse-index.csv
```csv
Date,Open,High,Low,Close,Volume,Turnover
2024-01-01,2800.50,2850.75,2795.25,2847.23,1500000,4250000000
2024-01-02,2847.23,2875.50,2830.00,2865.40,1650000,4725000000
```

### nepse-stocks.csv
```csv
Symbol,Company,Sector,Price,Change,Change_Percent,Volume,Turnover,High_52W,Low_52W,Market_Cap,PE_Ratio
NICL,Nepal Investment Bank Limited,Banking,450.50,12.25,2.8,150000,67575000,485.00,380.25,45.2B,18.5
NABIL,Nabil Bank Limited,Banking,520.75,-8.50,-1.6,120000,62490000,580.00,420.50,52.1B,22.3
```

### nepse-indices.csv
```csv
Name,Symbol,Current,Change,Change_Percent,High_52W,Low_52W,Date
NEPSE Index,NEPSE,2847.23,15.40,0.54,3200.50,2400.25,2024-01-01
Sensitive Index,SENSITIVE,567.89,8.25,1.47,600.00,480.50,2024-01-01
```

## Notes:

- The import script will automatically detect and transform your CSV data
- Column names are flexible - the script will try to match common variations
- Make sure your CSV files have headers
- Large datasets will be imported in batches to avoid timeouts
- Check the console output for import progress and any errors

## Troubleshooting:

- **File not found**: Make sure CSV files are in the `./data/` directory
- **Import errors**: Check that your CSV format matches the expected schema
- **Database errors**: Verify your Supabase credentials in `.env.local`
- **Permission errors**: Ensure your service role key has write permissions
