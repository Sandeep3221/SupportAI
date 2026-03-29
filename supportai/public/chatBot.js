(function(){
    const style = document.createElement("style");
    style.innerHTML = `
        .support-ai-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; background: linear-gradient(135deg, #2563eb, #9333ea); }
        .support-ai-btn:hover { transform: scale(1.08); box-shadow: 0 20px 40px -10px rgba(147, 51, 234, 0.6); }
        .support-ai-box { transition: opacity 0.3s ease, transform 0.3s ease; transform-origin: bottom right; z-index: 2147483647 !important; }
        .support-ai-scrollbar::-webkit-scrollbar { width: 6px; }
        .support-ai-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .support-ai-scrollbar::-webkit-scrollbar-thumb { background: #d4d4d8; border-radius: 10px; }
        .support-ai-input:focus { border-color: #2563eb !important; background-color: #fff !important; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important; }
        .support-ai-send:hover { background-color: #27272a !important; }
        .support-ai-close:hover { opacity: 1 !important; color: #ef4444 !important; }
        .support-ai-dot { width: 6px; height: 6px; background: #a1a1aa; border-radius: 50%; animation: supportAIBounce 1.4s infinite ease-in-out both; }
        .support-ai-dot:nth-child(1) { animation-delay: -0.32s; }
        .support-ai-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes supportAIBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
        @keyframes supportAIPulse { 0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); } 70% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); } 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); } }
        @media (max-width: 480px) {
            .support-ai-box { width: calc(100% - 32px) !important; right: 16px !important; bottom: 85px !important; height: 480px !important; max-height: 75vh !important; }
            .support-ai-btn { right: 16px !important; bottom: 16px !important; width: 50px !important; height: 50px !important; font-size: 24px !important; }
        }
    `;
    document.head.appendChild(style);

    const api_Url=`http://localhost:3000/api/chat`
    const scriptTag=document.currentScript;
    const ownerId=scriptTag.getAttribute("data-owner-id");
    
    if(!ownerId){
        console.error("Owner ID not provided in data-owner-id attribute");
        return;
    }

    const button=document.createElement("div");
    button.className = "support-ai-btn";
    button.innerHTML="💬";
    Object.assign(button.style,{
        position:"fixed",
        bottom:"24px",
        right:"24px",
        width:"56px",
        height:"56px",
        borderRadius:"50%",
        color:"#fff",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        fontSize:"26px",
        cursor:"pointer",
        boxShadow:"0 15px 35px -5px rgba(0,0,0,0.2)",
        zIndex:2147483647,
    });
    document.body.appendChild(button);

    const box=document.createElement("div");
    box.className = "support-ai-box";
    Object.assign(box.style,{
        position:"fixed",
        bottom:"95px",
        right:"24px",
        width:"350px",
        height:"550px",
        maxHeight:"calc(100vh - 120px)",
        backgroundColor:"#fff",
        borderRadius:"24px",
        boxShadow:"0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
        display:"none",
        flexDirection:"column",
        overflow:"hidden",
        fontFamily:"Inter, system-ui, sans-serif",
        opacity:"0",
        transform:"scale(0.95)"
    });

    box.innerHTML=`<div style="background: linear-gradient(to right, #18181b, #27272a); color:#fff; padding:16px 20px; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:8px; height:8px; background-color:#4ade80; border-radius:50%; animation: supportAIPulse 2s infinite;"></div>
            <span style="font-weight:600; font-size:15px; letter-spacing:0.3px;">Customer Support</span>
        </div>
        <span id="chat-close" class="support-ai-close" style="cursor:pointer; font-size:18px; opacity:0.6; transition:all 0.2s;">✕</span>
    </div>
    
    <div id="chat-messages" class="support-ai-scrollbar" style="flex:1; padding:20px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; background-color:#fafafa;">
        <div style="align-self: flex-start; background-color: #fff; border: 1px solid #e4e4e7; color: #27272a; padding: 12px 16px; border-radius: 20px; border-top-left-radius: 4px; font-size: 14px; line-height: 1.5; box-shadow: 0 2px 4px rgba(0,0,0,0.02); max-width: 85%;">
            Hello! How can I help you today?
        </div>
    </div>
    
    <div style="display:flex; padding:12px 16px; border-top:1px solid #f4f4f5; gap:10px; background-color:#fff;">
        <input id="chat-input" class="support-ai-input" type="text" placeholder="Type your message..." style="flex:1; padding:10px 16px; border:1px solid #e4e4e7; border-radius:100px; outline:none; font-size:14px; background-color:#f4f4f5; transition:all 0.2s; min-width:0;">
        <button id="chat-send" class="support-ai-send" style="padding:0 18px; background-color:#18181b; color:#fff; border:none; border-radius:100px; cursor:pointer; font-weight:600; font-size:14px; transition:all 0.2s; display:flex; align-items:center; justify-content:center; flex-shrink:0;">Send</button>
    </div>`;
    document.body.appendChild(box);

    button.onclick=()=>{
        const isHidden = box.style.display === "none";
        if (isHidden) {
            box.style.display = "flex";
            setTimeout(() => {
                box.style.opacity = "1";
                box.style.transform = "scale(1)";
            }, 10);
        } else {
            box.style.opacity = "0";
            box.style.transform = "scale(0.95)";
            setTimeout(() => {
                box.style.display = "none";
            }, 300);
        }
    }

    document.getElementById("chat-close").onclick=()=>{
        box.style.opacity = "0";
        box.style.transform = "scale(0.95)";
        setTimeout(() => {
            box.style.display = "none";
        }, 300);
    }

    const messagearea=document.getElementById("chat-messages");
    const input=document.getElementById("chat-input");
    const sendBtn=document.getElementById("chat-send");

    input.addEventListener("keypress", (e)=>{
        if(e.key==="Enter"){
            sendBtn.click();
        }
    });

    function addMessage(text, from){
        const bubble=document.createElement("div");
        bubble.innerHTML=text;
        Object.assign(bubble.style,{
            maxWidth:"85%",
            padding:"12px 16px",
            borderRadius:"20px",
            fontSize:"14px",
            lineHeight:"1.5",
            alignSelf:from==="user"?"flex-end":"flex-start",
            background:from==="user"?"linear-gradient(135deg, #2563eb, #9333ea)":"#fff",
            color:from==="user"?"#fff":"#27272a",
            border:from==="user"?"none":"1px solid #e4e4e7",
            borderTopRightRadius:from==="user"?"4px":"20px",
            borderTopLeftRadius:from==="user"?"20px":"4px",
            boxShadow:from==="user"?"0 4px 12px rgba(147, 51, 234, 0.2)":"0 2px 4px rgba(0,0,0,0.02)",
            wordWrap: "break-word"
        });
        messagearea.appendChild(bubble);
        messagearea.scrollTop=messagearea.scrollHeight;
    }

    sendBtn.onclick=async()=>{
        const text=input.value.trim();
        if(!text)return;
        addMessage(text, "user");
        input.value="";
        
        const typing=document.createElement("div");
        typing.innerHTML=`<div style="display:flex; gap:4px; padding:4px 2px;"><div class="support-ai-dot"></div><div class="support-ai-dot"></div><div class="support-ai-dot"></div></div>`;
        Object.assign(typing.style,{
            alignSelf:"flex-start",
            backgroundColor:"#fff",
            border:"1px solid #e4e4e7",
            padding:"10px 16px",
            borderRadius:"20px",
            borderTopLeftRadius:"4px",
            boxShadow:"0 2px 4px rgba(0,0,0,0.02)"
        });
        messagearea.appendChild(typing);
        messagearea.scrollTop=messagearea.scrollHeight;

        try{
            const response=await fetch(api_Url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({ownerId, message:text})
            });
            const data=await response.json();
            messagearea.removeChild(typing);
            addMessage(data.response, "ai");
        } catch(error){
            messagearea.removeChild(typing);
            addMessage("Sorry, I'm having trouble connecting to the server.", "ai");
        }
    }
})()