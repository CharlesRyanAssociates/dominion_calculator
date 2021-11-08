import React, { useState } from 'react'
import Field from './field'

const programList = {
  recSelect: "REC Select",
  renewable: "100% Renewable Energy",
  greenPower: "Green Power",
  solar: "Community Solar"
};

const kWhCost = {
  recSelect: 0.00075,
  renewable: 0.00398,
  greenPower: 0.013,
  solar: 0.02
};

function App(){
  const [program, setProgram] = useState('');
  const [option, setOption] = useState('');
  const [blocks, setBlocks] = useState(1);
  const [usage, setUsage] = useState(1000);
  const [result, setResult] = useState(null);

  function setResultWithFormat(value){
    setResult(parseFloat(value).toFixed(2))
  }

  function calculate(){
    if( option === 'total' ){
      return calculateCost();
    }else{
      return calculateBlocks();
    }
  }

  function calculateCost(){
    const cost = kWhCost[program];
    setResultWithFormat(cost * parseFloat(usage));
  }

  function calculateBlocks(){
    if( program === 'greenPower' ){
      setResultWithFormat(2.00 * blocks);
      return;
    }
    
    const cost = kWhCost[program];
    setResultWithFormat((cost * parseFloat(blocks) * 100.0));
    return;
  }

  function setProgramType(type){
    setProgram(type);
    if( type === 'renewable' ){
      setOption('total')
    }
  }

  // function ensureBlocks(event){
  //   const max = program === 'solar' ? 5 : 99;
  //   if( parseInt(event.target.value) > max ){
  //     setBlocks(max);
  //   }
  // }

  function resetForm(event){
    setProgram('');
    setOption('');
    setBlocks(1);
    setUsage(1000);
    setResult(null);
  }

  const allOptionsFilled = (program !== '' && option !== '' && blocks !== null && usage !== null);

  return (
    <div className="container">
      <div className="section-header text-center">
          <h2 className="mb-0">Renewable Programs Cost Calculator</h2>
      </div>
      <div id="ecalc_main" className="bg-light col-md-10 p-4 mx-auto">
          { result === null && 
          <>
          <Field name="calc_program" label="Step 1: Select Program" className="align-items-center mb-4" hint={
            <span className="d-block form-text">Take this <a href="https://uidev.charlesryan.com/dominion/quiz/">quiz</a> to find the renewable energy program that is right for you.</span>
          }>
              <select className="form-control rounded-0" id="calc_program" onChange={ e => setProgramType(e.target.value) } value={program}>
                <option value="" disabled> Choose a program...</option>
                {Object.keys(programList).map( k => (
                  <option key={k} value={k}>{programList[k]}</option>
                ))}
              </select>
          </Field>

          <Field name="calc_option" label="Step 2: Choose an Option" className="align-items-center mb-4" hint={
            <>
            <span className="d-block form-text">
              Match all (100%) or just a portion (Block) of my electricity consumption with renewable resources.
            </span>
            { program === 'renewable' && <span className="d-block form-text text-muted small">
              *Block Option is not  available for 100% Renewable Energy.
            </span> }
            </>
              
          }>
              <select className="form-control rounded-0" id="calc_option" onChange={e => setOption(e.target.value)} value={option}>
                { program === 'renewable' ? (
                  <option value="total">100%</option>
                ) : (
                  <>
                  <option value="" disabled> Choose an option...</option>
                  <option value="total">100%</option>
                  <option value="block">Block</option>
                  </>
                )}
              </select>
          </Field>
          
          { option === 'block' && 
          <Field name="calc_blocks" label="Number of Blocks" className="align-items-center" hint={program === 'solar' ? "Commercial customers are allowed a max of ten blocks." : ""}>
            <input className="form-control" type="number" min="1" step="1" id="calc_blocks" value={blocks} maxLength={2} onChange={ e => setBlocks(e.target.value) } />
          </Field>
          }

          { option === 'total' && 
          <div className="form-group row justify-content-between">
              <div className="col-12 col-md-6 col-form-label">
                <label htmlFor="calc_usage">Monthly kWk Usage</label>
                <span className='form-text'>
                  <span className="d-block">The average residential customer uses around 1,000 kWh a month. Update this number with  your own monthly usage for a more accurate cost estimate!</span>
                  <a href="https://uidev.charlesryan.com/dominion/calculator/sample_bill.jpg" target="_blank">Where do I find this on my bill?</a>
                </span>
              </div>
              <div className="col-12 col-md-4">
                <div className="d-flex align-items-center">
                  <input className='form-control' type="number" min="1" size={4} id="calc_usage" defaultValue={usage} aria-describedby="calc_usage_hint" onBlur={e => setUsage(parseFloat(e.target.value))} />
                  <span className="d-block h-100 px-2 py-3 bg-dark text-white border border-dark" id="calc_usage_hint">kWh</span>
                </div>
              </div>
          </div>
          }
          <div className="text-right">
            <button type="button" className="button" onClick={calculate} disabled={!allOptionsFilled}>Calculate</button>
          </div>
        </>
        }
        {
          result !== null && 
          <div>
            <div className="row justify-content-between m-0 p-2">
                <div className="col-12 col-md-8">
                  <h2 className="mt-0">Monthly Added Cost for {programList[program]} { program === 'renewable' ? "" : (option === 'block' ? "Block Option" : "100% Option") }</h2>
                  { option !== 'block' && <span className="form-text mb-4">This is an estimate only. Your monthly cost will change depending on how much electricity you use. </span> }
                  <button type="button" className="button" onClick={resetForm}>Re-Calculate</button> 
                </div>
                <div className="col-12 col-md-4 text-right pt-md-2">
                  <span className="h3 font-weight-bold d-block" style={{ fontSize: "1.5rem" }}>${result}</span>
                </div>
            </div>
          </div>
        }
      </div>
  </div>
  )
}

export default App;
