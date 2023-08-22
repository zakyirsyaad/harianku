import { useEffect, useState } from 'react';
import './App.css';
import './responsive.css'
import { AiFillDelete } from 'react-icons/ai';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai'
import AOS from 'aos';
import { Toaster, toast } from 'react-hot-toast';
AOS.init();

function App() {
  const [completed, setCompleted] = useState(false);
  const [allTodolist, setAlltodolist] = useState([]);
  const [newTitle, setNewtitle] = useState("");
  const [newDescription, setNewDescripton] = useState("");
  const [completedItem, setCompleteditem] = useState([]);

  const handleAdd = () => {
    let newItem = {
      title: newTitle,
      description: newDescription
    };
    let updatedItem = [...allTodolist];
    updatedItem.push(newItem);
    setAlltodolist(updatedItem);
    localStorage.setItem("To Do List", JSON.stringify(updatedItem));

    setNewtitle("");
    setNewDescripton("");
    toast.success('Semangat Kegiatannyaa yaa!')
  };

  const handleDelete = (index) => {
    let updatedItem = [...allTodolist];
    updatedItem.splice(index, 1);

    localStorage.setItem("To Do List", JSON.stringify(updatedItem));
    setAlltodolist(updatedItem);
    toast.error("Kamu Berhasil Menghapus Kegiatan")
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '/' + mm + '/' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodolist[index],
      completedOn: completedOn
    };
    let updatedCompleted = [...completedItem];
    updatedCompleted.push(filteredItem);
    setCompleteditem(updatedCompleted);
    handleDelete(index);
    localStorage.setItem("Completed Item", JSON.stringify(updatedCompleted));
    toast.success('Selamat Kamu Telah Menyelesaikan!')
  };

  const handleDeleteComplete = (index) => {
    let updatedCompleted = [...completedItem];
    updatedCompleted.splice(index, 1);

    localStorage.setItem("Completed Item", JSON.stringify(updatedCompleted));
    setCompleteditem(updatedCompleted);

    toast.error("Kamu Berhasil Menghapus Kegiatan")
  };

  useEffect(() => {
    let saveItem = JSON.parse(localStorage.getItem("To Do List"));
    let saveCompletedItem = JSON.parse(localStorage.getItem("Completed Item"));
    if (saveItem) {
      setAlltodolist(saveItem);
    }
    if (saveCompletedItem) {
      setCompleteditem(saveCompletedItem);
    }
  }, []);

  return (
    <div className="todo-container">
      <Toaster />
      <p className='header-todo' data-aos="fade-left" data-aos-duration="1500">Harianku</p>
      <p className='description-todo' data-aos="fade-right" data-aos-duration="1500">Hari ini aku ngapain aja yaa?</p>

      <div className="todo-wrap">
        <p className='header-input' data-aos="fade-up" data-aos-duration="1500">Tulis Yuk Kegiatan Kamu Hari Ini シ</p>
        <div className='todo-input-container' data-aos="flip-left" data-aos-duration="1500">
          <div className='todo-input'>
            <input type="text" name="" id="" placeholder='Whats the task title?'
              value={newTitle} onChange={(e) => setNewtitle(e.target.value)}
            />
          </div>
          <div className='todo-input'>
            <input type="text" name="" id="" placeholder='Whats the task Description?'
              value={newDescription} onChange={(e) => setNewDescripton(e.target.value)}
            />
          </div>
          <div>
            <button className='add' onClick={handleAdd}>Add</button>
          </div>
        </div>

        <div className='list-container' data-aos="flip-right" data-aos-duration="1500">
          <div>
            <button className={`list-btn ${completed === false && 'active'}`} onClick={() => setCompleted(false)}>Active</button>
            <button className={`list-btn ${completed === true && 'active'}`} onClick={() => setCompleted(true)}>Completed</button>
          </div>

          {completed === false && allTodolist.map((item, index) => (
            <div className='list' key={index} data-aos="fade-up" data-aos-duration="1500">
              <div className='list-item'>
                <p className='title'>{item.title}</p>
                <p className='description'>{item.description}</p>
              </div>
              <div className='list-icon'>
                <AiFillDelete size={40} color="red" onClick={() => handleDelete(index)} title='delete?' />
                <BsFillCheckSquareFill size={30} color='#22196a' onClick={() => handleComplete(index)} title='completed?' />
              </div>
            </div>
          ))}

          {completed === true && completedItem.map((item, index) => (
            <div className='list' key={index} data-aos="fade-up" data-aos-duration="1500">
              <div className='list-item'>
                <p className='title'>{item.title}</p>
                <p className='description'>{item.description}</p>
                <p className='description'>Completed on: {item.completedOn}</p>
              </div>
              <div className='list-icon'>
                <AiFillDelete size={40} color="red" onClick={() => handleDeleteComplete(index)} title='delete?' />
              </div>
            </div>
          ))}

        </div>
      </div>
      <footer>
        <p className='footer-todo'>Boleh kasih Kritik atau Saran yaa ke sini</p>
        <a href="https://www.instagram.com/zakyirsyaad/" target="_blank" rel="noopener noreferrer" class="username">
          <AiFillInstagram size={30} />zakyirsyaad
        </a>
      </footer>
    </div>
  );
}

export default App;
