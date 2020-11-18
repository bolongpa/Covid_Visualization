import * as d3 from 'd3';
import WordCloud from 'react-d3-cloud';
import words from '../../assets/data/words.json'
import React, { Component } from 'react';

const WCloud = (props) => {

    var data = []

    var important_words = ["lockdown","unemployment","rate","lack","Covid","coronovirus","quarantine","drop","gdp","travel","ban","economy",""]
    var stopwords = new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall,people".split(","))
    
    data = words.filter(w => w.length>5 && !stopwords.has(w.toLowerCase()))
    // console.log("ori",data)
    for (var i=0;i<important_words.length;i++){
        data.push(...Array(Math.floor(Math.random()*(20-10))+10).fill(important_words[i]))
    }
    // console.log("after",data)
    data = d3.rollups(data, group => group.length, w => w)
    .sort(([, a], [, b]) => d3.descending(a, b))
    .slice(0, 200)
    .map(([text, value]) => ({text, value}))
    

    var fontSizeMapper = word => word.value * 5;
    var rotate = word => word.value % 360;

    return ( <React.Fragment>
        <div  style={{"width":"100%"}}>
        <WordCloud
            data={data}
            fontSizeMapper={fontSizeMapper}
            height={500}
            width={900}
            padding={1}/>
        </div> 
        </React.Fragment>
    )
}

export default WCloud;