import moment from 'moment';

class EBook {
  constructor({id, cover, title, category, description, slug, reviewer, tags, download, date, createdBy} = {}) {
    this.id = id;
    this.cover = cover;
    this.title = title;
    this.category = category;
    this.description = description;
    this.slug = slug;
    this.reviewer = reviewer;
    this.tags = tags;
    this.download = download;
    this.date = date;
    this.createdBy = createdBy;
  }

  search(word) {
    if(this.title.toLowerCase().includes(word.toLowerCase())) return true;
    return false;
  }

  static fromDB(data) {
    return new EBook({
      id: data.ebook_id,
      cover: data.thumbnail,
      title: data.ebook_title,
      category: data.category_name,
      description: data.ebook_description,
      slug: data.slug,
      reviewer: data.peninjau,
      download: data.ebook_file,
      tags: data.tags == null ? [] : data.tags,
      date: moment(data.create_at),
      createdBy: data.penyusun,
    });
  }
}

export default EBook;
