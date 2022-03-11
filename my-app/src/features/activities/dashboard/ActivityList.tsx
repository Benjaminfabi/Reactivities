import React, { SyntheticEvent, useState } from "react";
import { Button,  Item, ItemContent, ItemHeader, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/layout/models/Activity";

interface Props {
    activities: Activity[]
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({activities, selectActivity, deleteActivity, submitting}: Props) {
    const[target, setTarget] = useState('');


    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return(
        <Segment >
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <ItemContent>
                            <ItemHeader as={'a'}>{activity.title}</ItemHeader>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={()=> selectActivity(activity.id)}/>
                                <Button name={activity.id} loading={submitting && target === activity.id} floated='right' content='Delete' color='red' onClick={(e)=> handleActivityDelete(e, activity.id)}/>
                                <Label basic content={activity.category}/>
                                
                            </Item.Extra>
                        </ItemContent>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}