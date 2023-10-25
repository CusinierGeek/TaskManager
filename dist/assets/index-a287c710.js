var k=Object.defineProperty;var L=(d,e,t)=>e in d?k(d,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[e]=t;var n=(d,e,t)=>(L(d,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const c=document.getElementById("title-input"),r=document.getElementById("description-input"),S=document.getElementById("addTaskBtn"),g=document.getElementById("tasksTableHeader"),p=document.getElementById("tasksTable");c.addEventListener("input",()=>{localStorage.setItem("titleValue",c.value)});r.addEventListener("input",()=>{localStorage.setItem("descriptionValue",r.value)});S.addEventListener("click",()=>{T.addTask(c.value,r.value)});const h=class{constructor(e,t,o=!1,s=new Date().toLocaleString(),i=h.nextId++){n(this,"id");n(this,"title");n(this,"description");n(this,"completed");n(this,"lastModified");this.id=i,this.title=e,this.description=t,this.completed=o,this.lastModified=s}};let l=h;n(l,"nextId",1);class I{constructor(){n(this,"tasks",[]);this.loadTasksFromLocalStorage(),this.loadNextIdToLocalStorage()}addTask(e,t){const o=new l(e,t);this.tasks.push(o),this.saveTasksToLocalStorage(),this.saveNextIdToLocalStorage(),this.showTasks()}updateTaskStatus(e,t){const o=this.getTaskById(e);o&&(o.completed=t,o.lastModified=new Date().toLocaleString(),this.saveTasksToLocalStorage())}editTask(e,t,o){const s=this.getTaskById(e);s&&(s.title=t,s.description=o,s.lastModified=new Date().toLocaleString(),this.saveTasksToLocalStorage(),this.showTasks())}deleteTask(e){const t=this.tasks.findIndex(o=>o.id===e);if(t!==-1){const o=p.querySelector(`#taskRow-${e}`);o&&(o.classList.add("deleted"),setTimeout(()=>{this.tasks.splice(t,1),this.saveTasksToLocalStorage(),this.showTasks()},200))}}showTasks(){p.innerHTML="",this.tasks.length===0?g.innerHTML="":(g.innerHTML="<th>Task Id</th><th>Title</th><th>Description</th><th>Completed</th><th>Last Modified</th><th>Update/Delete</th>",this.tasks.forEach(e=>{const t=p.insertRow();t.id=`taskRow-${e.id}`,t.classList.add("task-row"),e.completed&&t.classList.add("completed"),t.insertCell().textContent=e.id.toString(),t.insertCell().textContent=e.title,t.insertCell().textContent=e.description;const o=t.insertCell(),s=document.createElement("input");s.type="checkbox",s.checked=e.completed,o.appendChild(s),s.addEventListener("change",()=>{t.classList.toggle("completed"),this.updateTaskStatus(e.id,s.checked)}),t.insertCell().textContent=e.lastModified;const i=t.insertCell(),a=document.createElement("button");a.textContent="Update",a.classList.add("commandBtn"),a.addEventListener("click",()=>{let m=c.value.trim(),f=r.value.trim();confirm(`are you sure you want to update this task?

 Title: `+m+` 

 Description: `+f)&&this.editTask(e.id,m,f)}),i.appendChild(a);const u=document.createElement("button");u.textContent="Delete",u.classList.add("commandBtn"),u.addEventListener("click",()=>{t.classList.add("delete-animation"),setTimeout(()=>{this.deleteTask(e.id)},300)}),i.appendChild(u)}))}saveNextIdToLocalStorage(){localStorage.setItem("nextid",JSON.stringify(l.nextId))}loadNextIdToLocalStorage(){l.nextId=JSON.parse(localStorage.getItem("nextid")||"1")}saveTasksToLocalStorage(){localStorage.setItem("tasks",JSON.stringify(this.tasks))}loadTasksFromLocalStorage(){const e=localStorage.getItem("tasks"),t=localStorage.getItem("titleValue"),o=localStorage.getItem("descriptionValue");if(e){const s=JSON.parse(e);this.tasks=s.map(i=>new l(i.title,i.description,i.completed,i.lastModified,i.id))}else this.tasks=[new l("Ex: Faire la vaisselle","Ex: Effectuer des mouvements circulaires sur la vaisselle avec une éponge",!1,"2021-03-01 12:00:00",1)];t&&(c.value=t),o&&(r.value=o)}getTaskById(e){return this.tasks.find(t=>t.id===e)}}const T=new I;T.showTasks();
