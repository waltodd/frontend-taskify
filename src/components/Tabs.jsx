import React, {useState} from 'react'
import {TaskList} from '@/components'


const tabData = [
    { id: "tab1", label: "Pendentes" },
    { id: "tab2", label: "Concluídas" },
  ];
  
  const TabButtons = ({ tabData, activeTab, setActiveTab }) => {
    return (
      <div className='flex-row mb-3 justify-center items-center flex-1 max-sm:w-full max-w-[380px] mx-auto '>
        <div className="flex p-2 flex-row justify-center items-center gap-4 m-2 bg-[#F5F7F9] w-[250px] rounded-[12px]">
        {tabData.map((item, index) => (
          <div
            key={item.id}
            className={`cursor-pointer py-2 px-3 rounded-[12px] font-epiloguetext-[28px]  ${activeTab === index ? "font-bold bg-[#1dc071] text-white" : "bg-[#F5F7F9] text-[#8D9CB8]"}`}
            onClick={() => setActiveTab(index)}
          >
            {item.label}
          </div>
        ))}
      </div>
      </div>
    );
  };
  
  const Tabs = () => {
    const [activeTab, setActiveTab] = useState(0);
  
    return (
      <div>
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} tabData={tabData} />
        {activeTab === 0 ? <TaskList showCompleted={false} /> : <TaskList showCompleted={true} />}
      </div>
    );
  };
  
  export default Tabs;