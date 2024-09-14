'use client';

import { type EdgeStoreRouter } from '../app/api/edgestore/[...edgestore]/route';
import { createEdgeStoreProvider } from '@edgestore/react';

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

const uploadFile = async (file: File, edgestoreInstance: any) => {
    const res = await edgestoreInstance.publicFiles.upload({
        file: file
    }); 
    return res.url;
};

export { EdgeStoreProvider, useEdgeStore, uploadFile };