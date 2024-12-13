import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const NextFitMemoryAllocation = () => {
  const [blockInput, setBlockInput] = useState('');
  const [requestSize, setRequestSize] = useState('');
  const [message, setMessage] = useState('');
  const [blocks, setBlocks] = useState([]);

  // Handle input changes
  const handleBlockInputChange = (event) => {
    setBlockInput(event.target.value);
  };

  const handleRequestSizeChange = (event) => {
    setRequestSize(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const blockSizes = blockInput.split(',').map(block => parseInt(block.trim()));


    try {
      const response = await axios.post('http://localhost:5000/allocate', {
        blocks: blockSizes,
        requestSize: parseInt(requestSize)
      });
      setMessage(response.data.message);
      setBlocks(response.data.updatedBlocks);
    } catch (error) {
      setMessage('Error processing allocation.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">NextFit memory allocation</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm" style={{ backgroundColor: '#E0F7FA' }}>
            <div className="form-group">
              <label htmlFor="blockInput">Memory Blocks (use commas)</label>
              <input
                type="text"
                className="form-control"
                id="blockInput"
                value={blockInput}
                onChange={handleBlockInputChange}
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="requestSize">Request Size</label>
              <input
                type="number"
                className="form-control"
                id="requestSize"
                value={requestSize}
                onChange={handleRequestSizeChange}
                
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-primary btn-block"  style={{ backgroundColor: '#000000'}}>Allocate</button>
          </form>
        </div>
      </div>

      {/*result message */}
      <div className="mt-4">
        <h5 >Result</h5>
        <p>{message}</p>
      </div>

      {/*updated memory blocks */}
      <div className="mt-4">
        <h5>Updated Memory Blocks</h5>
        <ul>
          {blocks.map((block, index) => (
            <li key={index}>Block {index + 1}: {block}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NextFitMemoryAllocation;
