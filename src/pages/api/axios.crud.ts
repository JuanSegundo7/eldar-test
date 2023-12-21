import { IResource } from "@/types/types";
import axios from "axios";

export const get_resource = async (id: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_KEY}/posts/${id}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const get_all = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_KEY}/posts`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const create_resource = async (resource: IResource) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_KEY}/posts`,
      resource
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const update_resource = async (resource: IResource, id: number) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_KEY}/posts/${id}`,
      resource
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const delete_resource = async (id: number) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_KEY}/posts/${id}`
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
