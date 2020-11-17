import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar 
export default function Sidebar(){
  return S.list().title(`Slicks's Slices`).items([
    S.listItem().title(`Home Page`).icon(() => <strong>🔥</strong>).child(
      S.editor().schemaType(`storeSettings`).documentId('downtown')),

      ...S.documentTypeListItems().filter(item => item.getId() !== 'storeSettings'),
  ])
}