import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { DevToService } from '../../core/services/devto.service';
import { Article } from '../../core/models/article.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    DatePipe,
    GlassCardComponent,
    PageHeaderComponent,
    LoadingSkeletonComponent,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  template: `
    <div class="blog-container container">
      <app-page-header 
        command="ls -la ~/articles"
        title="Technical Articles"
        description="Thoughts on development, AI, and quantum computing"
        icon="article"
      />
      
      @if (loading()) {
        <div class="loading-grid">
          @for (skeleton of [1,2,3,4,5,6]; track skeleton) {
            <app-glass-card>
              <app-loading-skeleton [height]="200" />
              <app-loading-skeleton [height]="30" />
              <app-loading-skeleton [height]="20" [width]="200" />
              <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <app-loading-skeleton [height]="24" [width]="60" />
                <app-loading-skeleton [height]="24" [width]="60" />
                <app-loading-skeleton [height]="24" [width]="60" />
              </div>
            </app-glass-card>
          }
        </div>
      } @else if (error()) {
        <app-glass-card>
          <div class="error-message">
            <mat-icon>error_outline</mat-icon>
            <p>{{ error() }}</p>
            <button mat-raised-button color="primary" (click)="loadArticles()">
              <mat-icon>refresh</mat-icon> Retry
            </button>
          </div>
        </app-glass-card>
      } @else {
        @if (paginatedArticles().length > 0) {
          <div class="articles-grid">
            @for (article of paginatedArticles(); track article.id) {
              <app-glass-card>
                <article class="article-card">
                  @if (article.cover_image) {
                    <img 
                      [src]="article.cover_image" 
                      [alt]="article.title"
                      class="article-image"
                    />
                  }
                  
                  <div class="article-content">
                    <h2>{{ article.title }}</h2>
                    <p class="article-description">{{ article.description }}</p>
                    
                    <div class="article-tags">
                      @for (tag of article.tag_list.slice(0, 3); track tag) {
                        <span class="tag">{{ tag }}</span>
                      }
                      @if (article.tag_list.length > 3) {
                        <span class="tag-more">+{{ article.tag_list.length - 3 }}</span>
                      }
                    </div>
                    
                    <div class="article-meta">
                      <span class="date">
                        <mat-icon>calendar_today</mat-icon>
                        {{ article.published_at | date: 'MMM d, y' }}
                      </span>
                      <span class="reading-time">
                        <mat-icon>schedule</mat-icon>
                        {{ article.reading_time_minutes }} min
                      </span>
                    </div>
                    
                    <div class="article-stats">
                      <span class="stat">
                        <mat-icon>favorite</mat-icon>
                        {{ article.public_reactions_count }}
                      </span>
                      <span class="stat">
                        <mat-icon>comment</mat-icon>
                        {{ article.comments_count }}
                      </span>
                    </div>
                    
                    <a 
                      mat-raised-button 
                      color="primary" 
                      [href]="article.url" 
                      target="_blank"
                    >
                      <mat-icon>launch</mat-icon>
                      Read Article
                    </a>
                  </div>
                </article>
              </app-glass-card>
            }
          </div>
          
          @if (totalArticles() > pageSize()) {
            <div class="pagination-wrapper">
              <mat-paginator
                [length]="totalArticles()"
                [pageSize]="pageSize()"
                [pageIndex]="pageIndex()"
                [pageSizeOptions]="pageSizeOptions()"
                (page)="onPageChange($event)"
                showFirstLastButtons
                aria-label="Select page of articles">
              </mat-paginator>
            </div>
          }
        } @else {
          <app-glass-card>
            <div class="empty-state">
              <mat-icon>article</mat-icon>
              <h3>No Articles Found</h3>
              <p>Check back later for new content!</p>
            </div>
          </app-glass-card>
        }
      }
    </div>
  `,
  styles: [`
    .blog-container {
      max-width: var(--container-xl);
      margin: 0 auto;
      padding: var(--spacing-xl);
      
      @media (max-width: 639px) {
        padding: var(--spacing-md);
      }
    }
    
    .loading-grid,
    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--spacing-2xl);
      
      @media (max-width: 639px) {
        grid-template-columns: 1fr;
      }
    }
    
    .error-message,
    .empty-state {
      text-align: center;
      padding: var(--spacing-3xl) var(--spacing-xl);
      
      mat-icon {
        font-size: var(--spacing-4xl);
        width: var(--spacing-4xl);
        height: var(--spacing-4xl);
        color: var(--color-accent);
        margin-bottom: var(--spacing-md);
      }
      
      h3 {
        color: var(--color-primary);
        margin-bottom: var(--spacing-sm);
      }
      
      p {
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-lg);
      }
      
      button mat-icon {
        margin-right: var(--spacing-xs);
        font-size: var(--font-size-lg);
        width: var(--font-size-lg);
        height: var(--font-size-lg);
      }
    }
    
    .article-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      
      .article-image {
        width: 100%;
        height: 12.5rem;
        object-fit: cover;
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-md);
        border: 1px solid var(--glass-border);
      }
      
      .article-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        
        h2 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-sm);
          color: var(--color-primary);
          line-height: var(--line-height-snug);
        }
        
        .article-description {
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-md);
          flex: 1;
          line-height: var(--line-height-relaxed);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
          
          .tag {
            background: rgba(var(--color-primary-rgb), 0.2);
            color: var(--color-primary-light);
            padding: var(--spacing-xs) var(--spacing-md);
            border-radius: var(--radius-full);
            font-size: var(--font-size-xs);
            border: 1px solid rgba(var(--color-primary-rgb), 0.3);
            font-family: var(--font-mono);
          }
          
          .tag-more {
            background: rgba(var(--color-accent-rgb), 0.2);
            color: var(--color-accent);
            padding: var(--spacing-xs) var(--spacing-md);
            border-radius: var(--radius-full);
            font-size: var(--font-size-xs);
            border: 1px solid rgba(var(--color-accent-rgb), 0.3);
            font-family: var(--font-mono);
          }
        }
        
        .article-meta {
          display: flex;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-sm);
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          font-family: var(--font-mono);
          
          span {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            
            mat-icon {
              font-size: var(--font-size-base);
              width: var(--font-size-base);
              height: var(--font-size-base);
            }
          }
        }
        
        .article-stats {
          display: flex;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-md);
          
          .stat {
            color: var(--color-accent);
            font-size: var(--font-size-sm);
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            
            mat-icon {
              font-size: var(--font-size-base);
              width: var(--font-size-base);
              height: var(--font-size-base);
            }
          }
        }
        
        a {
          margin-top: auto;
          
          mat-icon {
            margin-right: var(--spacing-xs);
          }
        }
      }
    }
    
    .pagination-wrapper {
      margin-top: var(--spacing-3xl);
      display: flex;
      justify-content: center;
      
      ::ng-deep .mat-mdc-paginator {
        background: var(--glass-bg);
        backdrop-filter: blur(var(--glass-blur));
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        color: var(--color-text-primary);
        font-family: var(--font-mono);
        
        .mat-mdc-paginator-page-size-label,
        .mat-mdc-paginator-range-label {
          color: var(--color-text-primary);
          font-size: var(--font-size-sm);
        }
        
        .mat-mdc-icon-button {
          color: var(--color-primary);
          
          &:disabled {
            color: var(--color-text-disabled);
          }
        }
      }
    }
  `]
})
export class BlogComponent implements OnInit {
  private devToService = inject(DevToService);
  
  articles = signal<Article[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  
  // Pagination
  pageIndex = signal(0);
  pageSize = signal(6);
  pageSizeOptions = signal([6, 12, 24]);
  
  totalArticles = computed(() => this.articles().length);
  
  paginatedArticles = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.articles().slice(start, end);
  });
  
  ngOnInit() {
    this.loadArticles();
  }
  
  loadArticles() {
    this.loading.set(true);
    this.error.set(null);
    
    this.devToService.getArticles().subscribe({
      next: (articles) => {
        this.articles.set(articles);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load articles');
        this.loading.set(false);
      }
    });
  }
  
  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    
    // Scroll to top of articles
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}