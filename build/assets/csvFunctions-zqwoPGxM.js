function a(e,n){let o="";for(let t=0;t<e.rows.length;t++){let c=e.rows[t],s=[];for(let l=0;l<c.cells.length;l++)s.push(c.cells[l].textContent);o+=s.join(",")+`
`}r(o,n)}const r=(e,n)=>{const o=new Blob([e],{type:"text/csv;charset=utf-8;"}),t=document.createElement("a");t.href=URL.createObjectURL(o),t.download=`${n}.csv`,t.click(),t.remove()};export{r as d,a as t};
