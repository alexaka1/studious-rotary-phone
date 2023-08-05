import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createClient, Entry } from 'contentful';

const type /*:CONTENT_TYPE*/ = 'pageBlogPost';

const CONFIG = {
  space: import.meta.env['CONTENTFUL_SPACE_ID'],
  accessToken: import.meta.env['CONTENTFUL_ACCESS_TOKEN'],

  contentTypeIds: {
    blog: 'pageBlogPost',
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
}
