import React, { useEffect, useRef,useState } from 'react';

import {useForm} from 'react-hook-form'
import mqtt from 'mqtt'

const Map = ( props ) => {
    
      const { register, handleSubmit, watch, formState: { errors } } = useForm();
      const [client, setClient] = useState(null)
      const [isSubed, setIsSub] = useState(false)
      const [payload, setPayload] = useState({})
      const [connectStatus, setConnectStatus] = useState('Connect')
      const mqttConnect = (host, mqttOption) => {
        console.log('Connecting to host:', host);
        console.log('MQTT options:', mqttOption);
        setConnectStatus('Connecting');
        setClient(mqtt.connect(host,mqttOption));
      };
        useEffect(() => {
          
          if (client) {
             
            client.on('connect', () => {
              setConnectStatus('Connected');
            });
            client.on('error', (err) => {
              console.error('Connection error: ', err);
              console.log('err');
              client.end();
            });
            client.on('reconnect', () => {
              setConnectStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {
              const payload = { topic, message: message.toString() };
              setPayload(payload);
            });
          }
        }, [client]);
        const initialConnectionOptions = {
          // ws or wss
          protocol: 'ws',
          host: 'broker.emqx.io',
          clientId: 'emqx_react_' + Math.random().toString(16).substring(2, 8),
          // ws -> 8083; wss -> 8084
          port: 8083,
          /**
           * By default, EMQX allows clients to connect without authentication.
           * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
           */
          username: 'emqx_test',
          password: 'emqx_test'
        }
        
        const mqttPublish = (context) => {
          if (client) {
          console.log(context);
            const { topic, qos, payload } = context;
            client.publish(topic, payload, { qos }, error => {
              if (error) {
                console.log('Publish error: ', error);
              }
            });
          }
        }
        const mqttDisconnect = () => {
          if (client) {
            client.end(() => {
              setConnectStatus('Connect');
            });
          }
        }
      const onSubmit = (data) =>{ console.log(data);
      
        mqttConnect('ws://broker.emqx.io:8083/mqtt',initialConnectionOptions)} 
      // Return a div element to hold the map
      return (
        <div>
            
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('query',{ required: true })} type='text' placeholder='Search'></input>
                {errors.query && <span>This field is required</span>}
                <input type='submit'></input>
            </form>
            </div>
        </div>
      
      );
     
   }
 export default Map;

