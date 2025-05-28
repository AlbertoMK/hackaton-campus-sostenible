import axios from 'axios';

import type { Container, ContainerHistory, ContainerLevel } from './interfaces';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const getContainers = async(): Promise<Container[]> => {
    const response = await api.get<Container[]>('containers');
    return response.data;
}

export const getLevels = async(): Promise<ContainerLevel[]> => {
    const response = await api.get<ContainerLevel[]>('level');
    return response.data;
}

export const getHistory = async(id: string): Promise<ContainerHistory[]> => {
    const response = await api.get<ContainerHistory[]>('history');
    return response.data;
}

export const getContainersByCenter = async(center: string): Promise<Container[]> => {
    const response = await api.get<Container[]>('containersByCenter', {
  params: {
    center: center,
  }
});
    return response.data;
}

