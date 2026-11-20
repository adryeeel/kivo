import {
  Check,
  ChevronDown,
  LockKeyhole,
  Plus,
  ShoppingBasket,
  Sun,
  Users,
} from 'lucide-react';
import { Brand } from '../../components/brand';

export function FamilyPreview() {
  return (
    <aside className="showcase" aria-label="A preview of your family space">
      <Brand />
      <div className="showcase-content">
        <div className="family-label">
          <Users size={15} aria-hidden="true" /> A little more together
        </div>
        <h2>
          Life is shared.
          <br />
          Money can be, too.
        </h2>
        <p className="showcase-description">
          From the everyday shop to the next big adventure.
          <br className="desktop-break" /> Make room for what matters, together.
        </p>

        <div className="family-preview">
          <div className="preview-heading">
            <div className="workspace-name">
              <span className="workspace-icon">
                <Users size={17} aria-hidden="true" />
              </span>{' '}
              Our family <ChevronDown size={13} aria-hidden="true" />
            </div>
            <div
              className="avatars"
              role="img"
              aria-label="Ana, Bruno, and Clara"
            >
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </div>
          </div>
          <div className="preview-totals">
            <div>
              <span>Shared this month</span>
              <strong>
                €1,280<span>.00</span>
              </strong>
            </div>
            <div>
              <span>You are owed</span>
              <strong>
                €60<span>.00</span>
              </strong>
            </div>
          </div>
          <div className="expense-preview">
            <span className="expense-icon">
              <ShoppingBasket size={18} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div className="expense-description">
              <strong>The weekly shop</strong>
              <span>Ana paid · Split between 3</span>
            </div>
            <div className="expense-amount">
              <strong>€90.00</strong>
              <span>
                <Check size={11} aria-hidden="true" /> Split equally
              </span>
            </div>
          </div>
          <div className="goal-preview">
            <div className="goal-heading">
              <span className="goal-icon">
                <Sun size={19} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <strong>A summer together</strong>
                <span>Our next family adventure</span>
              </div>
              <span className="goal-plus" aria-hidden="true">
                <Plus size={15} />
              </span>
            </div>
            <div className="goal-amount">
              <strong>
                €740 <span>of €2,400</span>
              </strong>
              <span>31%</span>
            </div>
            <div
              className="goal-progress"
              role="progressbar"
              aria-label="Summer goal"
              aria-valuemin={0}
              aria-valuemax={2400}
              aria-valuenow={740}
              aria-valuetext="740 euros marked saved toward 2,400 euros"
            >
              <span />
            </div>
            <p>A little closer to making memories.</p>
          </div>
        </div>
        <div className="preview-caption">
          <span /> An illustrative look at your family space
        </div>
      </div>
      <div className="showcase-footer">
        <LockKeyhole size={14} aria-hidden="true" />
        <span>Your own finances stay your own.</span>
      </div>
    </aside>
  );
}
