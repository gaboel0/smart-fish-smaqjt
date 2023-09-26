package com.unimar.smartfish.dto;

import java.util.ArrayList;
import java.util.List;

public class Response<T> {
    private T data;
    private List<String> error = new ArrayList<>();

    public T getData(){
        return data;
    }

    public void setData(T data){
        this.data = data;
    }

    public List<String> getError(){
        return error;
    }

    public void setError(List<String> error){
        this.error = error;
    }
}
