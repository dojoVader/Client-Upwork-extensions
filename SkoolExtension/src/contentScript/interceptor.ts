const scriptElement = document.createElement('script');
scriptElement.id = 'skool-interceptor';



scriptElement.textContent = `
const responsFunc = Response.prototype.json;

Response.prototype.json = async function(){
    const data = await responsFunc.call(this);
     if(data.hasOwnProperty('channel') && data.channel.hasOwnProperty('id')){
        localStorage.setItem('currentUser',data.channel.id);
    }
    return data;
}

`;

document.head.prepend(scriptElement);