import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createClient, Entry } from 'contentful';
import { INLINES, BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';

const type /*:CONTENT_TYPE*/ = 'pageBlogPost';

const CONFIG = {
  space: import.meta.env['CONTENTFUL_SPACE_ID'],
  accessToken: import.meta.env['CONTENTFUL_ACCESS_TOKEN'],

  contentTypeIds: {
    blog: 'pageBlogPost',
  },
};

const options: Options = {
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: () => 'ASSET_HYPERLINK',
    [INLINES.HYPERLINK]: () => 'HYPERLINK',
    [INLINES.EMBEDDED_ENTRY]: () => 'EMBEDDED_ENTRY',
    [INLINES.ENTRY_HYPERLINK]: () => 'ENTRY_HYPERLINK',
    [BLOCKS.EMBEDDED_ENTRY]: (node) => `${node.data['target'].sys.id}`,
    [BLOCKS.EMBEDDED_ASSET]: () => 'BLOCKEMBEDDED_Asset',
    [BLOCKS.EMBEDDED_RESOURCE]: () => 'BLOCKEMBEDDED_Resource',
  },
};

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
  });
  public posts: Entry<any>[] = [];

  constructor() {}

  async getProducts(query?: object): Promise<Entry[]> {
    const res = await this.cdaClient.getEntries(
      Object.assign(
        {
          content_type: type,
        },
        query
      )
    );
    return res.items;
  }

  async ngOnInit(): Promise<void> {
    this.posts = await this.getProducts();
  }

  returnHtmlFromRichText(richText: any) {
    if (richText === undefined || richText === null || richText.nodeType !== 'document') {
      return '<p>Error</p>';
    }
    return documentToHtmlString(richText, options);
  }
}
