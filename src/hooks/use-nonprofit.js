import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEnv } from "../context/env.context";
import { useState, useEffect, useCallback } from "react";


export default function useNonprofit( nonprofit_id ){
    
    const { getAccessTokenSilently, user } = useAuth0();
    const { apiServerUrl } = useEnv();
    const [nonprofits, setNonprofits] = useState([]);
    const [nonprofit, setNonprofit] = useState({
        "name":"",
        "description":"",
        "slack_channel":""
    });


    const makeRequest = useCallback(async (options) => {
        try {
            if (options.authenticated) {
                const token = await getAccessTokenSilently();

                options.config.headers = {
                    ...options.config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }

            const response = await axios(options.config);
            const { data } = response;

            return data;
        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                return error.response;
            }

            return error.message;
        }
    }, [getAccessTokenSilently]);



    const handle_new_npo_submission = async (name, email, npoName, description, website, slack_channel, checked, onComplete) => {
        if (!user)
            return null;

        const config = {
            url: `${apiServerUrl}/api/messages/npo`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: {
                name: name,
                email: email,
                npoName: npoName,
                description: description,
                website: website,
                slack_channel: slack_channel,
                // We send just the ID to the backend, it will convert this to an object
                // Ref: https://stackoverflow.com/a/59394211
                problem_statements: checked.map(item => {
                    return `${item}`
                })
            }
        };

        const data = await makeRequest({ config, authenticated: true });
        onComplete(data.text);
        return data;
    };

    const handle_npo_problem_statement_edit = async (id, checked, onComplete) => {
        if (!user)
            return null;
        
        const config = {
            url: `${apiServerUrl}/api/messages/npo/edit`,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: {
                id: id,               
                // We send just the ID to the backend, it will convert this to an object
                // Ref: https://stackoverflow.com/a/59394211
                problem_statements: checked.map(item => {
                    return `${item}`
                })
            }
        };

        const data = await makeRequest({ config, authenticated: true });
        onComplete(data.text); // Comes from backend, something like "Updated NPO" when successful
        return data;
    };

    const handle_npo_problem_statement_delete = async ( id ) => {
        if (!user)
            return null;

        const config = {
            url: `${apiServerUrl}/api/messages/npo`,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: {
                id: `${id}`
            }
        };
                
        const data = await makeRequest({ config, authenticated: true });
        return data;
    };


    useEffect(() => {        
        const getNonprofits = async () => {        
            var config = null;
            if (nonprofit_id)
            {
                config = {
                    url: `${apiServerUrl}/api/messages/npo/${nonprofit_id}`,                    
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                };
            }
            else {
                config = {
                    url: `${apiServerUrl}/api/messages/npos`,
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                };
            }
            

            // Publically available, so authenticated: false here
            const data = await makeRequest({ config, authenticated: false });

            if (data) {              

                if (data.status && data.status === 403) {
                    setNonprofits([]);
                }
                else {                   
                    if (nonprofit_id)
                    {
                        setNonprofit(data.nonprofits);
                    }
                    else {
                        setNonprofits(data.nonprofits);
                    }
                    
                }
            }
            else {
                setNonprofits([]);
                setNonprofit({
                    "name": "",
                    "description": "",
                    "slack_channel": ""
                });
            }
        };

        getNonprofits();
    }, [user, apiServerUrl, makeRequest, nonprofit_id]);



    return {
        nonprofits,        
        nonprofit,
        handle_npo_problem_statement_edit,
        handle_new_npo_submission,
        handle_npo_problem_statement_delete
    }
}