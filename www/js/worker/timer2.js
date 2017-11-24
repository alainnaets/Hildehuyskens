var tijd = 5;

function timer()
{
	postMessage(tijd);
	if(Number(tijd)>0) tijd=Number(tijd)-1;
	setTimeout(timer,1000);
}

timer();