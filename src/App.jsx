import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import './appStyle.css'
const App = () => {
  const [fileUploaded,setFileUploaded] = useState([])
  const [searchItems,setSearchItems] = useState([])
  const [searchValue,setSearchValue] = useState('')
  useEffect(()=>{
    const isSearch = [];

    fileUploaded.map((el)=>{
      if(el[0].toLowerCase().includes(searchValue.toLocaleLowerCase())){
        isSearch.push(el)
      } 
    })

    setSearchItems(isSearch)
  },[searchValue])
  const handleUpload = (e)=>{
    console.log(e)
    let files = e.target.files, f = files[0];
    let reader = new FileReader();
    
    reader.onload = (e) =>{
      let data = e.target.result;
      let readedData = XLSX.read(data,{
        type: 'binary'
      });
      let wsname = readedData.SheetNames[0];
      let ws = readedData.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws,{
        header: 1
      });
      setFileUploaded([...dataParse])
      setSearchItems([...dataParse])
    }
    reader.readAsBinaryString(f)
  
  }



  return (
    <div>
      <div className="header">
        <h1>Parser</h1>
      </div>

      <div className="file_upload">
        <input  onChange={handleUpload} type="file" />  
        <button onClick={(e)=> {
          console.log(fileUploaded)
          }} className="upbutton">
          в консоль
        </button>

      </div>

      <div className="search">
        <input onChange={(e)=>{setSearchValue(e.target.value)}} value={searchValue} type="text" placeholder='поиск'/>
      </div>
          

      <div className="output">
      {
          (searchItems)?(
            searchItems.map((el,index)=>(
            <div key={index} className="item_block">
            <p className='item' >{el[0]}</p>
            <p className='item' ><span>Год рождения</span>  - {el[1]}</p>
            <p className='item' ><span>Место жительства</span> - {el[2]}</p>
            <p className='item' ><span>Номер телефона</span> - {el[3]}</p>
            <p className='item' ><span>Год начала обуч.</span> - {el[4]}</p>
            <p className='item' ><span>Год окончания обуч.</span> - {el[5]}</p>
            <p className='item' ><span>№ страхового свидетельства</span>  - {el[6]}</p>
            <p className='item' ><span>медицинский полис</span> - {el[7]}</p>
            <p className='item' ><span>№ и серия паспорта</span> - {el[8]}</p>
            <p className='item' ><span>ИНН</span>- {el[9]}</p>

            </div>
            ))  
          ):(
            <h2>Загрузка</h2>
          )
          
          }
      </div>
        

       
    </div>
  )
}

export default App