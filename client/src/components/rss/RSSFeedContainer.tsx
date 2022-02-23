import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { values } from "lodash";
import axios from "axios";
import Parser from 'rss-parser';




const RSSFeed: React.FC = () => {


  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [stories, setStories] = useState<any[]>([]);

  

  const getFeed = (selectedTab: number) => {
    axios.get(`/routes/rss/populate/${selectedTab}`)
      .then((data) => {
        setStories(data);
      })
      .catch((err) => {
        throw err;
      })

   
};


useEffect(() => {
  getFeed(0);
}, [])


  const tabs = ["Eater", "NYT Food", "Delish"];

  return (
    <div>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={(e, value) => {
          setSelectedTab(value);
          getFeed(selectedTab);
        }
          }>
          {tabs.map((tab, i) => <Tab label={tab} key={tab} />)}
        </Tabs>
      </AppBar>
      {/* <RenderFeed selectedTab={selectedTab} /> */}
      {stories.map((story, i) => {
        let {creator, title, pubDate, link} = story;
        return(
          <div>
            <h5>{title}</h5>
            <h5>{creator}</h5>
            <h6>{pubDate}</h6>
            <a href="url">{link}</a>
          </div>
        )
      })}
    </div>
  )
}

export default RSSFeed;