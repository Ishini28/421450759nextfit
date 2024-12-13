const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(cors()); 
app.use(bodyParser.json()); 

// Next Fit Memory Allocation algorithm
const nextFitAllocation = (blocks, requestSize) => {
  let lastAllocated = -1;
  let allocated = false;
  let updatedBlocks = [...blocks];

  
  for (let i = (lastAllocated + 1) % blocks.length; i !== lastAllocated; i = (i + 1) % blocks.length) {
    if (updatedBlocks[i] >= requestSize) {
      updatedBlocks[i] -= requestSize;  
      lastAllocated = i;  
      allocated = true;  
      break;
    }
  }

  return {
    allocated,
    updatedBlocks
  };
};

// API endpoint
app.post('/allocate', (req, res) => {
  const { blocks, requestSize } = req.body;

  const result = nextFitAllocation(blocks, requestSize);

  if (result.allocated) {

    res.json({
      message: `Request of size ${requestSize} allocated successfully.`,
      updatedBlocks: result.updatedBlocks
    });
  } else {
    
    res.json({
      message: `Allocation failed. No block large enough to accommodate the request.`,
      updatedBlocks: result.updatedBlocks
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
