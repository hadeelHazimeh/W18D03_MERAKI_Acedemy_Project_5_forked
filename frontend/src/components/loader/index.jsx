import React from 'react';

function Loading() {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"90vh",backgroundColor:"#FEFEFE"}} className="text-center loading">
      
  
      <img style={{transform:"scale(0.4,0.4)"}} className='loader' src="https://res.cloudinary.com/dsyee942i/image/upload/v1709123381/load/r7q9zpzecdpskf5iwh9n.gif"/>
      
    </div>
  );
}//https://cdn.dribbble.com/users/570218/screenshots/6245586/gradient_loader.gif
//https://static.wixstatic.com/media/a216c1_a3dbee0bda44476288d4a088231f4d0f~mv2.gif
//<blockquote class="imgur-embed-pub" lang="en" data-id="qV4c5na"><a href="https://imgur.com/qV4c5na">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

export default Loading;
